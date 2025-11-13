import { Upload } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
interface ImageUploaderProps {
    value: File | undefined;
    onChange: (file: File | undefined) => void;
}

// Main App component
const ImageFileUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
    // State to hold the URL of the avatar image preview
    const [avatarPreview, setAvatarPreview] = useState<string>(
        'https://placehold.co/128x128/e0e0e0/64748b?text=Upload%20Avatar'
    );
    // State to control the visibility of the "Upload Avatar" placeholder text
    const [showPlaceholderText, setShowPlaceholderText] = useState<boolean>(true);
    // Ref to access the hidden file input element
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * Handles the change event when a file is selected via the input.
     * @param event The change event from the file input.
     */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the first selected file

        if (file) {
            // Check if the selected file is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    // Set the avatar preview to the loaded image data URL
                    setAvatarPreview(e.target?.result as string);
                    // Hide the placeholder text as an image is now present
                    setShowPlaceholderText(false);
                };

                // Read the file as a Data URL
                reader.readAsDataURL(file);
                onChange?.(file);
            } else {
                // If not an image, reset to default placeholder and show text
                setAvatarPreview('https://placehold.co/128x128/e0e0e0/64748b?text=Upload%20Avatar');
                setShowPlaceholderText(true);
                console.error('Please select an image file.');
                // In a real application, you might display a user-friendly error message here
                onChange?.(undefined);
            }
        } else {
            // If no file is selected (e.g., user cancels the file dialog), reset to default
            setAvatarPreview('https://placehold.co/128x128/e0e0e0/64748b?text=Upload%20Avatar');
            setShowPlaceholderText(true);
            onChange?.(value);
        }
    };

    /**
     * Prevents default drag behavior and adds a visual highlight.
     * @param event The drag event.
     */
    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add('border-blue-500', 'shadow-md'); // Highlight on drag over
    };

    /**
     * Removes the visual highlight when dragging leaves the area.
     * @param event The drag event.
     */
    const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
        event.currentTarget.classList.remove('border-blue-500', 'shadow-md');
    };

    /**
     * Handles the drop event, processes the dropped file.
     * @param event The drop event.
     */
    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-blue-500', 'shadow-md');

        const files = event.dataTransfer.files;
        if (files.length > 0 && files[0]) { // Ensure files[0] exists before using it
            // Create a DataTransfer object to simulate a file input change
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(files[0]);

            if (fileInputRef.current) {
                fileInputRef.current.files = dataTransfer.files;
                // Manually trigger the change event on the hidden input
                fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    };

    return (
        <div className="w-full flex">
            {/* Label acts as the clickable area for the hidden file input */}
            <label
                htmlFor="attachments"
                className="flex-1 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Hidden file input */}
                <input
                    type="file"
                    id="attachments"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                {/* Avatar image preview */}
                {/*  */}
                {!showPlaceholderText && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        id="attachmentsPreview"
                        className="w-full h-full object-cover"
                        src={avatarPreview}
                        alt="attachments Preview"
                    />
                )}

                {/* Placeholder text, visible if no image is uploaded */}
                {showPlaceholderText && (
                    <span id="placeholderText" className="">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            Click to upload images, videos, or documents
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Maximum file size: 10MB
                        </p>
                    </span>
                )}
            </label>
        </div>
    );
};

export default ImageFileUploader;
