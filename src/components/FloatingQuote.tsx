import { useEffect, useState } from "react"
import useGetRandomQuote from "../services/quotes/getRandomQuote"
import LoadingSpinner from "./LoadingSpinner"
import { cn } from "../lib/utils"
import { Card } from "./ui/card"

const FloatingQuote = () => {
  const { data: randomQuote, isLoading: isFetchingRandomQuote } = useGetRandomQuote("Progress")
  const [currentState, setCurrentState] = useState("close")

  console.log(randomQuote)

  useEffect(() => {
    if (randomQuote) {
      sessionStorage.setItem("floatingQuote", JSON.stringify(randomQuote))
    }
  }, [randomQuote])

  function handleToggle() {
    const rotatingArrow = document.getElementById("rotating-arrow") as HTMLElement
    if (currentState === "close") {
      setCurrentState("open")
      rotatingArrow.style.transform = "rotate(180deg)"
    } else {
      setCurrentState("close")
      rotatingArrow.style.transform = "rotate(0deg)"
    }
  }

  return (
    <Card className={cn("fixed top-20 p-2 text-sm flex cursor-pointer transition-all duration-600 z-50", currentState === "close" ? "-right-2 items-center" : "right-0 items-start")} onClick={handleToggle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ opacity: 1 }} className=" transition-all duration-500" id="rotating-arrow">
        <path fill="none" d="m15 18l-6-6l6-6" />
      </svg>
      {isFetchingRandomQuote && currentState === "open" && <LoadingSpinner />}
      {!isFetchingRandomQuote && randomQuote && (
        <div className={cn("p-3 space-y-2 whitespace-pre-wrap transition-all duration-500", currentState === "close" ? "hidden" : " block max-w-[70vw] md:max-w-[40vw] h-full")}>
          <p className="text-sm">{randomQuote.quote}</p>
          <p className="text-xs text-right"> - {randomQuote.author}</p>
        </div>
      )}
    </Card>
  )
}

export default FloatingQuote
