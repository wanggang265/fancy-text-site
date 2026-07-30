interface StructuredDataProps {
  schema: Record<string, unknown>;
}

export default function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
