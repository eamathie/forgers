// Building paragraphs/text content
export type TextBlock = {
    type: "text";
    value: string;
};

export type ListBlock = {
    type: "list";
    items: string[];
};

export type ContentBlock = TextBlock | ListBlock;

export type ContentSection = {
    title: string;
    content: ContentBlock[];
};