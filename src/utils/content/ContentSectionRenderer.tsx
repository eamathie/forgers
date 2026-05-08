import { type ContentSection } from "./types/types";
import ContentBlockRenderer from "./ContentBlockRenderer";

const ContentSectionRenderer = ({ section }: { section: ContentSection }) => {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-lg font-bold">{section.title}</h2>

            {section.content.map((block, index) => (
                <ContentBlockRenderer key={index} block={block} />
            ))}
        </section>
    );
};

export default ContentSectionRenderer;