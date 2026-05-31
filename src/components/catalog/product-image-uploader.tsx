"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { uploadProductImage } from "@/src/utils/cloudinary-upload";

type ProductImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
};

export function ProductImageUploader({
  value,
  onChange,
}: ProductImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);

    try {
      const result = await uploadProductImage(file);
      onChange(result.secure_url);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to upload image";

      alert(message);
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    handleUpload(file);
  }

  function handleDragOver(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!uploading) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    if (uploading) return;

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    handleUpload(file);
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          "relative flex h-72 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-sm border border-dashed bg-[#111] transition-colors",
          isDragging
            ? "border-[#d42b2b] bg-[#1a0f0f]"
            : "border-[#333] hover:border-[#555]",
          uploading ? "cursor-not-allowed opacity-80" : "",
        ].join(" ")}
      >
        {value ? (
          <img
            src={value}
            alt="Product preview"
            className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale"
          />
        ) : (
          <div className="absolute inset-0 bg-[#111]" />
        )}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
          {uploading ? (
            <Loader2 className="animate-spin text-[#f0ece4]" size={36} />
          ) : value ? (
            <Upload className="text-[#f0ece4]" size={36} />
          ) : (
            <ImagePlus className="text-[#f0ece4]" size={40} />
          )}

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#f0ece4]">
              {uploading
                ? "Uploading..."
                : isDragging
                  ? "Drop image here"
                  : value
                    ? "Drop to replace image"
                    : "Drop product image"}
            </p>

            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#777]">
              or click to browse
            </p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={handleFileChange}
        />
      </button>

      <div className="flex w-full gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex flex-1 items-center justify-center rounded-sm bg-[#d42b2b] px-4 py-3 font-mono text-xs uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#b02020] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {value ? "Change Image" : "Upload Image"}
        </button>

        {value && (
          <button
            type="button"
            disabled={uploading}
            onClick={() => onChange("")}
            className="rounded-sm border border-[#333] px-4 py-3 text-[#888] transition-colors hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {value && (
        <p className="w-full truncate text-center font-mono text-[0.65rem] text-[#666]">
          {value}
        </p>
      )}
    </div>
  );
}
