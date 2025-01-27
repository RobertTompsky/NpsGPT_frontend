export const handleSetFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (value: React.SetStateAction<File | undefined>) => void
) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
        setFile(selectedFile);
    }
};
