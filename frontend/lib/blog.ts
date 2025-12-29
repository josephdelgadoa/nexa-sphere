import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { format } from "date-fns";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    formattedDate: string;
    excerpt: string;
    coverImage?: string;
    category: string;
    answer_capsule?: string;
    contentHtml?: string;
}

export function getSortedPostsData(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        const data = matterResult.data as { title: string; date: string | Date; excerpt: string; coverImage?: string; category: string; answer_capsule?: string };
        const dateObj = data.date instanceof Date ? data.date : new Date(data.date);
        const formattedDate = format(dateObj, 'MMMM d, yyyy');

        // Combine the data with the id
        return {
            slug,
            ...data,
            date: dateObj.toISOString(),
            formattedDate,
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getPostData(slug: string): Promise<BlogPost> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    // @ts-ignore - remark-html options potentially not typed correctly or varying by version
    const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(matterResult.content);
    let contentHtml = processedContent.toString();

    // Regex to find h2, h3, and h4 tags - we still run this to inject IDs for permalinks, even if we don't display ToC
    const headingRegex = /<(h[234])>(.*?)<\/\1>/g;

    contentHtml = contentHtml.replace(headingRegex, (match, tag, text) => {
        // Create slug from text (simple version)
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        return `<${tag} id="${id}">${text}</${tag}>`;
    });

    const data = matterResult.data as { title: string; date: string | Date; excerpt: string; coverImage?: string; category: string; answer_capsule?: string };

    // Ensure date is a string to prevent serialization errors in Next.js Server Components
    const dateObj = data.date instanceof Date ? data.date : new Date(data.date);
    const dateStr = dateObj.toISOString();
    const formattedDate = format(dateObj, 'MMMM d, yyyy');

    // Combine the data with the id and contentHtml
    return {
        slug,
        contentHtml,
        ...data,
        date: dateStr,
        formattedDate,
    };
}
