"use client"

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { ResumeServerData } from "@/lib/types"
import { mapToResumeValues } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { formatDate } from "date-fns";
import Link from "next/link";
import { format } from "path";
import { useState, useTransition } from "react";
import { MoreHorizontal, Copy, Trash, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteResume } from "./actions";
import { Dialog ,DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";

interface ResumeItemsProps {
    resume: ResumeServerData
}

export default function ResumeItems({resume}: ResumeItemsProps) {
    const wasUpdated = resume.updatedAt !== resume.createdAt;
    return <div className=" relative group border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3">
        <div className="space-y-3">
            <Link href={`/editor?resumeId=${resume.id}`} className="inline-block w-full text center">
            <p className="font-semibold line-clamp-1">
                {resume.title || "Untitled Resume"}
                </p> 
                {resume.description && (
                    <p className="line-clamp-2 text-sm">
                        {resume.description}
                    </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                    {wasUpdated ? "Updated" : "Created"} on{" "}
                    {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
                    </p>
            </Link>
            <Link 
            className="relative inline-block w-full"
            href={`/editor?resumeId=${resume.id}`}>
                <ResumePreview 
                resumeData={mapToResumeValues(resume)}
                className="overflow-hiddenshadow-sm transition-shadow group-hover: shadow-lg" />
            </Link>
        </div>

        <MoreMenu resumeId={resume.id} />
    </div>
} 

interface MoreMenuProps {
    resumeId: string;
}

function MoreMenu({resumeId}: MoreMenuProps) {
    const [showDeleteConformation, setShowDeleteConfirmation] = useState(false);

    return <>
     <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0.5 top-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                    <DropdownMenuItem onClick={() => {}}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => setShowDeleteConfirmation(true)}
                        className="text-destructive"
                    >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteConfirmation resumeId={resumeId} open={showDeleteConformation} onOpenChange={setShowDeleteConfirmation} />
    </>
}

interface DeleteConfirmationProps {
    resumeId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void
}

function DeleteConfirmation({resumeId, open, onOpenChange}: DeleteConfirmationProps) {
    const {toast} = useToast();
    const [isPending, startTransition] = useTransition();

    async function handleDelete(){
        startTransition(async () => {
            try {
                await deleteResume(resumeId);
                onOpenChange(false);
                window.location.reload();
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    description: "Something went wrong while deleting the resume",
                })
            } finally {
                onOpenChange(false);
                window.location.reload();
            }
        })
    }


    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Resume?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this resume? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <LoadingButton
                variant="destructive"
                onClick={handleDelete}
                loading={isPending}
                >
                    Delete
                </LoadingButton>
                <Button onClick={() => onOpenChange(false)} >Cancel</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}   