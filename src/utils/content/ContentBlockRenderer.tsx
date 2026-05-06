import { type ContentBlock, type TextSpan } from "./types/types";

const renderSpan = (span: TextSpan, index: number) => {
    let el: React.ReactNode = span.text;

    if (span.marks?.includes("italic")) {
        el = <em>{el}</em>;
    }

    if (span.marks?.includes("bold")) {
        el = <strong>{el}</strong>;
    }

    return <span key={index}>{el}</span>;
};

const ContentBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
    switch (block.type) {
        case "text":
            return <p>{block.value}</p>;

        case "list":
            return (
                <ul className="list-disc pl-5">
                    {block.items.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            );

        case "rich-text":
            return (
                <p className="text-base leading-relaxed">
                    {block.spans.map(renderSpan)}
                </p>
            );

        default:
            return null;
    }
};

export default ContentBlockRenderer;
