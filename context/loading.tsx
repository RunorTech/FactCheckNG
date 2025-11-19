'use-client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface LoadingProps {
  openDialog?: boolean
}

function Loading({ openDialog = false }: LoadingProps) {
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent className="bg-transparent shadow-none border-none p-0 m-0 !rounded-none">
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
           
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="container w-full h-full flex justify-center items-center">
            <div className="relative h-30 flex justify-center items-center">
              <div className="loader relative mx-auto my-5"></div>
              <div className="absolute bottom-0">
                <div className="flex space-x-2">
                  <div className="text-2xl font-bold">Loading</div>
                  <div className="flex self-end mb-1 space-x-2 ">
                    <div className="loader-dot"></div>
                    <div className="loader-dot animation-delay-100"></div>
                    <div className="loader-dot animation-delay-200"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export default Loading
