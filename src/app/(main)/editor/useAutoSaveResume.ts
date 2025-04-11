import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

export default function useAutoSaveResume(resumeData: ResumeValues, setResumeData){
        const debouncedValue = useDebounce(resumeData, 1500);

        const [lastSavedData, setLastSavedData] = useState(
            structuredClone(resumeData)
        
        )

        const [isSaving, setIsSaving] = useState(false);
        useEffect(() => {

            async function save() {
                setIsSaving(true);
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setLastSavedData(structuredClone(debouncedValue));
                setIsSaving(false);
            }

            const hasUnsavedChanges =
                JSON.stringify(debouncedValue) !==
                JSON.stringify(lastSavedData);


            if (hasUnsavedChanges && debouncedValue && !isSaving) {
                save();
            }

        },[debouncedValue, isSaving, lastSavedData]);
        return {
            isSaving,
            hasUnsavedChanges:
                JSON.stringify(debouncedValue) !==
                JSON.stringify(lastSavedData),
            };
}