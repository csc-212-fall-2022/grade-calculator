// it seems ridiculous to define a component for this, but if we want reusability...

import React from "react"

interface ScoreProps {
    score: number
    decimals?: number
}

export const Score: React.FC<ScoreProps> = (scoreProps: ScoreProps) => {
    const places = scoreProps.decimals || 2

    return <>{scoreProps.score.toLocaleString(undefined, {maximumFractionDigits: places})}</>
}

export default Score