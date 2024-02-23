"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle: any
  }
}

const AdSense = ({ adSlot }: { adSlot: any }) => {
  useEffect(() => {
    if (window) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6120553951071328" // Replace with your publisher ID
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}

export default AdSense
