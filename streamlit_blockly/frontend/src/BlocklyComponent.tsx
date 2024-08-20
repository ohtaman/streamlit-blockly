import { Streamlit, withStreamlitConnection } from "streamlit-component-lib"
import React, { useRef, useEffect, useMemo } from "react"
import * as Blockly from "blockly"
import "blockly/blocks"
import { pythonGenerator } from "blockly/python"
import { createBlocklyTheme } from "./themeUtils"
import { applyLocale } from "./localeUtils"

interface BlocklyComponentProps {
  args: {
    locale?: string
    toolbox?: any
    custom_blocks?: any[]
    workspace?: object | null
    height?: number
    trashcan?: boolean
    zoom?: {
      controls: boolean
      wheel: boolean
      startScale: number
      maxScale: number
      minScale: number
      scaleSpeed: number
    }
    sound?: boolean
  }
  theme: any
}

const registerCustomBlocks = (customBlocks: any[]) => {
  customBlocks.forEach((block) => {
    Blockly.Blocks[block.type] = {
      init: function () {
        this.jsonInit(block)
      },
    }
  })
}

const BlocklyComponent: React.FC<Partial<BlocklyComponentProps>> = (props) => {
  const blocklyDivRef = useRef<HTMLDivElement>(null)
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
  const prevWorkspaceStateRef = useRef<string>("")

  const args = props.args || {}
  const locale = args.locale || "en"
  const toolboxFromProps = args.toolbox
  const customBlocks = args.custom_blocks || []
  const initialWorkspaceState = args.workspace || null
  const height = args.height || 480
  const trashcan = args.trashcan || false
  const zoom = args.zoom
  const sound = args.sound !== false  // デフォルトでサウンドを有効にする

  const toolbox = useMemo(() => {
    return toolboxFromProps || {
      kind: "categoryToolbox",
      contents: Object.keys(pythonGenerator.forBlock).map((blockType) => ({
        kind: "block",
        type: blockType,
      })),
    }
  }, [toolboxFromProps])

  const theme = useMemo(() => createBlocklyTheme(props.theme), [props.theme])

  useEffect(() => {
    applyLocale(locale)
  }, [locale])

  useEffect(() => {
    registerCustomBlocks(customBlocks)
  }, [customBlocks])

  useEffect(() => {
    if (blocklyDivRef.current && !workspaceRef.current) {
      const workspace = Blockly.inject(blocklyDivRef.current, {
        toolbox: toolbox,
        theme: theme,
        zoom: zoom,
        trashcan: trashcan,  // ゴミ箱の設定
        sounds: sound,       // サウンドの設定
      })

      workspaceRef.current = workspace
      Streamlit.setFrameHeight()

      if (initialWorkspaceState) {
        Blockly.serialization.workspaces.load(initialWorkspaceState, workspace)
      }

      workspace.addChangeListener(() => {
        const currentWorkspaceState = Blockly.serialization.workspaces.save(workspace)
        const currentWorkspaceStateJson = JSON.stringify(currentWorkspaceState)

        if (currentWorkspaceStateJson !== prevWorkspaceStateRef.current) {
          prevWorkspaceStateRef.current = currentWorkspaceStateJson
          Streamlit.setComponentValue(currentWorkspaceState)
        }
      })
    }
  }, [toolbox, theme, initialWorkspaceState, trashcan, zoom, sound])

  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.updateToolbox(toolbox)
      workspaceRef.current.setTheme(theme)
    }
  }, [toolbox, theme])

  return (
    <div>
      <div ref={blocklyDivRef} style={{ height: height, width: "100%" }}></div>
    </div>
  )
}

export default withStreamlitConnection(BlocklyComponent)
