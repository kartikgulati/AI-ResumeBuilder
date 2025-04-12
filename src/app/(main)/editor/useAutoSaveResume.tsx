import { useToast } from '@/hooks/use-toast';
import useDebounce from '@/hooks/useDebounce';
import { Underdog } from 'next/font/google';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { saveResume } from './action';
import { Button } from '@/components/ui/button';

export default function useAutoSaveResume(resumeData: ResumeValues, setResumeData){

        const searchParam = useSearchParams();
        const {toast} = useToast();


        const debouncedValue = useDebounce(resumeData, 1500);

        const [resumeId, setResumeId] = useState(resumeData.id);

        const [lastSavedData, setLastSavedData] = useState(
            structuredClone(resumeData)
        
        )

        const [isSaving, setIsSaving] = useState(false);
        const [isError, setIsError] = useState(false);

        useEffect(() => {
            setIsError(false);
        },[debouncedValue])


        useEffect(() => {

            async function save() {
                try {
                    setIsSaving(true);
                    setIsError(false);

                    const newData = structuredClone(debouncedValue);
                    const updatedResume = await saveResume({
                        ...newData,
                        ...(lastSavedData.photo?.toString()=== newData.photo?.toString() && {photo: undefined}),
                        id: resumeId,
                    })

                    setResumeId(updatedResume.id);
                    setLastSavedData(updatedResume);

                    if(searchParam.get("id") !== updatedResume.id){
                        const newSearchParams = new URLSearchParams(searchParam);
                        newSearchParams.set("resumeId", updatedResume.id);
                        window.history.replaceState
                        (null, "", `?${newSearchParams.toString()}`);
                    }
                } catch (error) {

                    setIsError(true);
                    console.error("Error saving resume:", error);
                    const {dismiss} = toast({
                        variant: "destructive",
                        description: (
                            <div className='space-y-3'>
                                <p>Something went wrong, please try again</p>

                                <Button 
                                variant="secondary"
                                onClick={() => {
                                    dismiss();
                                    save();  
                                }}>
                                   Retry 
                                </Button>

                            </div>
                        )

                    })
                    
                }finally{
                    setIsSaving(false);

                }
            }

            const hasUnsavedChanges =
                JSON.stringify(debouncedValue) !==
                JSON.stringify(lastSavedData);


            if (hasUnsavedChanges && debouncedValue && !isSaving && !isError) {
                save();
            }

        },[debouncedValue, isSaving, lastSavedData. isError, searchParam, toast]);
        return {
            isSaving,
            hasUnsavedChanges:
                JSON.stringify(debouncedValue) !==
                JSON.stringify(lastSavedData),
            };
}