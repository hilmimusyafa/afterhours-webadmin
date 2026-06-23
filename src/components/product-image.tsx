"use client";

import Image, { type ImageLoaderProps } from "next/image";

function externalImageLoader({ src }: ImageLoaderProps): string {
    return src;
}

export default function ProductImage({
    src,
    alt,
    className,
    loading = "lazy",
}: {
    src: string;
    alt: string;
    className?: string;
    loading?: "eager" | "lazy";
}) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 50vw"
            loader={externalImageLoader}
            unoptimized
            loading={loading}
            className={className}
        />
    );
}
