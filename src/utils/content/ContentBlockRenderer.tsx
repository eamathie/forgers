import { type ContentBlock } from "./types/types";

interface Props {
    block: ContentBlock;
}

const ContentBlockRenderer: React.FC<Props> = ({ block }) => {
    switch (block.type) {
        case "text":
            return <p className="text-base leading-relaxed">{block.value}</p>;

        case "list":
            return (
                <ul className="list-disc pl-5 space-y-1">
                    {block.items.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            );

        default:
            return null;
    }
};

export default ContentBlockRenderer;
