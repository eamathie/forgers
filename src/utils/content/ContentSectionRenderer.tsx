import { type ContentSection } from "./types/types";
import ContentBlockRenderer from "./ContentBlockRenderer";

interface Props {
    section: ContentSection;
}

const ContentSectionRenderer: React.FC<Props> = ({ section }) => {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{section.title}</h2>

            {section.content.map((block, index) => (
                <ContentBlockRenderer key={index} block={block} />
            ))}
        </section>
    );
};

export default ContentSectionRenderer;