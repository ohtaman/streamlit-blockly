"""example"""

import random
from typing import Any, Dict

import streamlit as st

import streamlit_blockly as st_blockly

# ツールボックスの定義
toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Logic",
            "contents": [
                {"kind": "block", "type": "controls_if"},
                {"kind": "block", "type": "logic_compare"},
            ],
        },
        {
            "kind": "category",
            "name": "Loops",
            "contents": [
                {"kind": "block", "type": "controls_repeat_ext"},
                {"kind": "block", "type": "controls_whileUntil"},
            ],
        },
        {
            "kind": "category",
            "name": "Math",
            "contents": [
                {"kind": "block", "type": "math_number"},
                {"kind": "block", "type": "math_arithmetic"},
            ],
        },
        {
            "kind": "category",
            "name": "Custom",
            "contents": [
                {
                    "kind": "block",
                    "type": "print",
                },  # カスタムブロックをツールボックスに追加
            ],
        },
    ],
}

# カスタムブロックの定義
custom_blocks = [
    {
        "type": "print",
        "message0": "print %1",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT",
            },
        ],
        "previousStatement": None,
        "nextStatement": None,
        "colour": 160,
        "tooltip": "",
        "helpUrl": "",
    },
]

initial_workspace_state = {
    "blocks": {
        "languageVersion": 0,
        "blocks": [
            {
                "type": "controls_if",
                "id": "ifBlock",
                "x": 50,
                "y": 50,
                "inputs": {
                    "IF0": {
                        "block": {
                            "type": "logic_compare",
                            "id": "compareBlock",
                            "fields": {
                                "OP": "EQ"  # '==' comparison
                            },
                            "inputs": {
                                "A": {
                                    "block": {
                                        "type": "math_number",
                                        "id": "numBlockA",
                                        "fields": {"NUM": 10},
                                    }
                                },
                                "B": {
                                    "block": {
                                        "type": "math_number",
                                        "id": "numBlockB",
                                        "fields": {"NUM": 20},
                                    }
                                },
                            },
                        }
                    },
                    "DO0": {
                        "block": {
                            "type": "text_print",
                            "id": "printBlock",
                            "inputs": {
                                "TEXT": {
                                    "block": {
                                        "type": "text",
                                        "id": "textBlock",
                                        "fields": {"TEXT": "Hello World"},
                                    }
                                }
                            },
                        }
                    },
                },
            }
        ],
    }
}


# Streamlit UI
st.title("Streamlit Blockly Workspace Example")

if "blockly_json" not in st.session_state:
    st.session_state.blockly_json = initial_workspace_state

if "blocky_key" not in st.session_state:
    st.session_state.blockly_key = None

if st.button("load state"):
    st.session_state.blockly_key = random.random()

# Blocklyコンポーネントを埋め込む
blockly_json = st_blockly.workspace(
    "blockly",
    locale="en",
    toolbox=toolbox,
    custom_blocks=custom_blocks,
    workspace=st.session_state.blockly_json,
    key=st.session_state.blockly_key,
)

if st.button("save state"):
    st.session_state.blockly_json = blockly_json


# 受け取ったJSONを表示
if blockly_json:
    st.write("Blockly workspace JSON:")
    st.json(blockly_json)

    def parse_block(block: Dict[str, Any]) -> str:
        """Recursively parse a block and generate Python code."""
        block_type = block.get("type")

        if block_type == "controls_if":
            do_block = parse_block(block["inputs"]["DO0"]["block"])
            if_block = parse_block(block["inputs"]["IF0"]["block"]) if "IF0" in block["inputs"] else "True"
            return f"if {if_block}:\n    {do_block}"

        elif block_type == "logic_compare":
            a = parse_block(block["inputs"]["A"]["block"])
            b = parse_block(block["inputs"]["B"]["block"])
            operator = block["fields"]["OP"]
            operator_map = {
                "EQ": "==",
                "NEQ": "!=",
                "LT": "<",
                "LTE": "<=",
                "GT": ">",
                "GTE": ">=",
            }
            return f"{a} {operator_map.get(operator, '==')} {b}"

        elif block_type == "math_number":
            return str(block["fields"]["NUM"])

        elif block_type == "print":
            text = parse_block(block["inputs"]["TEXT"]["block"])
            return f"print({text})"

        elif block_type == "controls_repeat_ext":
            times = parse_block(block["inputs"]["TIMES"]["block"])
            do_block = parse_block(block["inputs"]["DO"]["block"])
            return f"for _ in range({times}):\n    {do_block}"

        elif block_type == "text":
            return f"'{block['fields']['TEXT']}'"

        else:
            return ""

    def generate_python_code(blockly_json: Dict[str, Any]) -> str:
        """Generate Python code from Blockly JSON."""
        blocks = blockly_json.get("blocks", {}).get("blocks", [])
        code_lines = []
        for block in blocks:
            code = parse_block(block)
            while "next" in block:
                block = block["next"]["block"]
                code += f"\n{parse_block(block)}"
            code_lines.append(code)
        return "\n".join(code_lines)

    # Generate Python code from the Blockly JSON
    python_code = generate_python_code(blockly_json)
    st.write("Generated Python code:")
    st.code(python_code)
