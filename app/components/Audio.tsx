"use client"

import { useRef } from "react"
import * as Tone from "tone"

const Audio = () => {
    const mic = useRef<Tone.UserMedia | null>(null)
    const pitchShifter = useRef<Tone.PitchShift | null>(null)
    const phaser = useRef<Tone.Phaser | null>(null)
    const gate = useRef<Tone.Gate | null>(null)

    const onStart = async () => {

        try {
            await Tone.start()
            mic.current = new Tone.UserMedia()
            pitchShifter.current = new Tone.PitchShift(-3)
            phaser.current = new Tone.Phaser({
                frequency: 40,
                octaves: 1,
                baseFrequency: 100
            })
            gate.current = new Tone.Gate(-35, 0.2)

            await mic.current.open()

            mic.current.connect(gate.current)
            gate.current.connect(pitchShifter.current)
            pitchShifter.current.connect(phaser.current)
            phaser.current.toDestination()

            console.log("Microphone is open")
        } catch (err) {
            console.error("Error opening microphone", err)
        }
        
    }

    return (
        <div>
            <button onClick={onStart} className="m-2 border rounded-lg bg-gray-500 hover:bg-gray-400">Goa'uldify</button>
        </div>
    )
}

export default Audio