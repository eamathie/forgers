import ContentSectionRenderer from "./ContentSectionRenderer"
import type { ContentSection } from "./types/types";

const ContentRenderer: React.FC<{ sections: ContentSection[] }> = ({ sections }) => {
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