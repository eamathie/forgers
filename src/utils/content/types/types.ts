// Building paragraphs/text content
type TextMark = "bold" | "italic";

export type TextSpan = {
    text: string;
    marks?: TextMark[];
};

type RichTextBlock = {
    type: "rich-text";
    spans: TextSpan[];
};

type TextBlock = {
    type: "text";
    value: string;
};

type ListBlock = {
    type: "list";
    items: string[];
};

export type ContentBlock = TextBlock | ListBlock | RichTextBlock;

export type ContentSection = {
    title: string;
    content: ContentBlock[];
};