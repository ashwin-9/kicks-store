import { ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({ currentPage, setCurrentPage, numPages }) => {
    
    const handlePageChange = (n) => {
        setCurrentPage(n);
    }

    const goToPrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    }

    const goToNextPage = () => {
        if (currentPage < numPages - 1) setCurrentPage(prev => prev + 1);
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-6 pb-4">
            <ChevronsLeft 
                onClick={currentPage > 0 ? goToPrevPage : undefined}
                className={
                    `w-8 h-8 p-1.5 rounded-full cursor-pointer transition-colors
                    ${currentPage === 0 ? 'text-base-300 cursor-not-allowed' : 'hover:bg-base-200 text-base-content'}`
                }
            />
            {[...Array(numPages).keys()].map(n => (
            <span 
                key={n} 
                onClick={() => handlePageChange(n)}
                className={
                    `flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors
                    ${currentPage === n ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`
                }
            >
                {n + 1}
            </span>
            ))}
            <ChevronsRight 
                onClick={currentPage < numPages - 1 ? goToNextPage : undefined}
                className={
                    `w-8 h-8 p-1.5 rounded-full cursor-pointer transition-colors
                    ${currentPage === numPages - 1 ? 'text-base-300 cursor-not-allowed' : 'hover:bg-base-200 text-base-content'}`
                }
            />
        </div>
    )
}

export default Pagination