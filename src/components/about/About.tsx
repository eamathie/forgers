type TextBlock = {
    type: "text";
    value: string;
};

type ListBlock = {
    type: "list";
    items: string[];
};

type ContentBlock = TextBlock | ListBlock;

type Paragraph = {
    title: string;
    content: ContentBlock[];
}

const paragraphs: Paragraph[] = [
    {
        title: "About Forgers™",
        content: [
            {
                type: "text",
                value:
                    "Forgers™ is a modern lifestyle store bringing together clothing, technology, and jewelry in one curated space. We focus on pieces that balance style and function, so you can express yourself through what you wear, use, and accessorize with—without overthinking it."
            }
        ]
    },
    {
        title: "Curated for Everyday Style",
        content: [
            {
                type: "text",
                value:
                    "Our collections are chosen to work together, making it easy to mix everyday essentials with standout details that fit your personal style. Whether you’re upgrading your look or adding the finishing touch, everything is designed to feel cohesive and effortless."
            }
        ]
    },
    {
        title: "No Trends, Just Taste",
        content: [
            {
                type: "text",
                value:
                    "At Forgers™, it’s not about chasing trends. It’s about offering products that feel current, well‑considered, and easy to make your own—pieces that feel right today and still make sense tomorrow."   
            }
        ]
    },
    {
        title: "Why the Name Forgers™",
        content: [
            {
                type: "text",
                value:
                    "The name Forgers™ reflects the idea of shaping something with intention. Just like forged materials are strengthened through careful craft, personal style and identity are shaped through thoughtful choices."
            },
            {
                type: "text",
                value:
                    "Forgers™ represents confidence, creativity, and the freedom to define your own look—without limits."
            }
        ]
    },
    {
        title: "Always Evolving",
        content: [
            {
                type: "text",
                value:
                    "We’re always exploring new ideas and refining our selection to bring you products that feel fresh, useful, and authentic."
            },
            {
                type: "text",
                value:
                    "Forgers™ — made for those who forge their own style."
            }
        ]
    }
];

const ContentBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
    switch (block.type) {
        case "text":
            return <p className="text-base">{block.value}</p>;
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

const About: React.FC = () => {
    return (
        <div className="relative flex-1 min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-8 p-8">
                {paragraphs.map(p => (
                    <section key={p.title} className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold">{p.title}</h2>
                        {p.content.map((block, index) => (
                            <ContentBlockRenderer key={index} block={block} />
                        ))}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default About;