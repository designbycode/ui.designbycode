import { toast } from 'sonner';

export function useFileHandling<
    T extends { files: Array<{ path: string; type: string; content: string }> },
>(data: T, setData: (callback: (prev: T) => T) => void) {
    const addFile = () => {
        setData((prev) => ({
            ...prev,
            files: [
                ...prev.files,
                { path: '', type: (prev as any).type, content: '' },
            ],
        }));
    };

    const removeFile = (index: number) => {
        if (data.files.length === 1) {
            toast.warning('A component must have at least one file.');

            return;
        }

        const updated = [...data.files];
        updated.splice(index, 1);
        setData((prev) => ({ ...prev, files: updated }));
    };

    const handleFileChange = (
        index: number,
        key: 'path' | 'type' | 'content',
        value: string,
    ) => {
        const updated = [...data.files];
        updated[index] = { ...updated[index], [key]: value };
        setData((prev) => ({ ...prev, files: updated }));
    };

    return { addFile, removeFile, handleFileChange };
}
