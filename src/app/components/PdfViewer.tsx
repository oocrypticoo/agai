"use client";
import dynamic from "next/dynamic";

interface PDFViewerProps {
  file: string;
}

const PDFViewerClient = dynamic(() => import("./PdfViewerClient"), {
  ssr: false,
  loading: () => <p></p>,
});

export default function PDFViewer(props: PDFViewerProps) {
  return <PDFViewerClient {...props} />;
}
