import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { Underdog } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./action";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";
import { ResumeValues } from "@/lib/validaton";

// export default function useAutoSaveResume(
//   resumeData: ResumeValues,
//   setResumeData
// ) {
//   const searchParam = useSearchParams();
//   const { toast } = useToast();

//   const debouncedValue = useDebounce(resumeData, 1500);

//   const [resumeId, setResumeId] = useState(resumeData.id);

//   const [lastSavedData, setLastSavedData] = useState(
//     structuredClone(resumeData)
//   );

//   const [isSaving, setIsSaving] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     setIsError(false);
//   }, [debouncedValue]);

//   useEffect(() => {
//     async function save() {
//       try {
//         setIsSaving(true);
//         setIsError(false);

//         const newData = structuredClone(debouncedValue);
//         const updatedResume = await saveResume({
//           ...newData,
//           ...(JSON.stringify(lastSavedData.photo, fileReplacer) === JSON.stringify(newData.photo, fileReplacer) && {
//             photo: undefined,
//           }),
//           id: resumeId,
//         });

//         setResumeId(updatedResume.id);
//         setLastSavedData(updatedResume);

//         if (searchParam.get("id") !== updatedResume.id) {
//           const newSearchParams = new URLSearchParams(searchParam);
//           newSearchParams.set("resumeId", updatedResume.id);
//           window.history.replaceState(
//             null,
//             "",
//             `?${newSearchParams.toString()}`
//           );
//         }
//       } catch (error) {
//         setIsError(true);
//         console.error("Error saving resume:", error);
//         const { dismiss } = toast({
//           variant: "destructive",
//           description: (
//             <div className="space-y-3">
//               <p>Something went wrong, please try again</p>

//               <Button
//                 variant="secondary"
//                 onClick={() => {
//                   dismiss();
//                   save();
//                 }}
//               >
//                 Retry
//               </Button>
//             </div>
//           ),
//         });
//       } finally {
//         setIsSaving(false);
//       }
//     }


//     console.log("debouncedResumedata", JSON.stringify(debouncedValue, fileReplacer));
//     console.log("lastSavedData", JSON.stringify(lastSavedData, fileReplacer));

//     const hasUnsavedChanges =
//       JSON.stringify(debouncedValue, fileReplacer) !== JSON.stringify(lastSavedData, fileReplacer);

//     if (hasUnsavedChanges && debouncedValue && !isSaving && !isError) {
//       save();
//     }
//   }, [debouncedValue, isSaving, lastSavedData, isError, searchParam, toast]);
//   return {
//     isSaving,
//     hasUnsavedChanges:
//       JSON.stringify(debouncedValue, fileReplacer) !== JSON.stringify(lastSavedData, fileReplacer),
//   };
// }
//////////////
// const hasUnsavedChanges =
// JSON.stringify(debouncedValue, fileReplacer) !== JSON.stringify(lastSavedData, fileReplacer) ||
// debouncedValue.photo instanceof File;

// if (hasUnsavedChanges && debouncedValue && !isSaving && !isError) {
// save();
// }
// }, [debouncedValue, isSaving, isError, searchParam, toast]);

// return {
// isSaving,
// hasUnsavedChanges:
// JSON.stringify(debouncedValue, fileReplacer) !== JSON.stringify(lastSavedData, fileReplacer) ||
// resumeData.photo instanceof File
// };
// }


//////////////////////

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();

  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    console.log(
      "debouncedResumeData",
      JSON.stringify(debouncedResumeData, fileReplacer),
    );
    console.log("lastSavedData", JSON.stringify(lastSavedData, fileReplacer));

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}