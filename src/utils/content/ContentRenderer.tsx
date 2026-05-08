import ContentSectionRenderer from "./ContentSectionRenderer"
import type { ContentSection } from "./types/types";

const ContentRenderer = ({ sections }: { sections: ContentSection[] }) => {
    return (
        sections.map(section => (
            <ContentSectionRenderer
                key={section.title}
                section={section}
            />
        ))
    );
};

export default ContentRenderer;