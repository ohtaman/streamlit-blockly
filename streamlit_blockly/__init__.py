"""__init__.py"""

import os
from typing import Any, Dict, List, Optional

import streamlit.components.v1 as components

_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "blockly_workspace",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("blockly_workspace", path=build_dir)


def workspace(
    name: str,
    key: Optional[str] = None,
    locale: str = "en",
    toolbox: Optional[Dict[str, Any]] = None,
    custom_blocks: Optional[List[Dict[str, Any]]] = None,
    workspace: Optional[Dict[str, Any]] = None,
    height: int = 480,
    trashcan: bool = True,
    zoom: Optional[Dict[str, Any]] = None,
    sound: bool = True,
) -> Any:
    """Create a new instance of the Blockly workspace component.

    Parameters
    ----------
    name: str
        The name of the Blockly workspace instance.
    key: Optional[str], optional
        An optional key that uniquely identifies this component.
    locale: str, optional
        The locale to use for Blockly messages (default is "en").
    toolbox: Optional[Dict], optional
        A dictionary defining the toolbox configuration for the Blockly workspace.
    custom_blocks: Optional[List], optional
        A list of custom block definitions to be added to the Blockly workspace.
    workspace: Optional[Dict], optional
        A dictionary representing the initial state of the Blockly workspace.
    height: int, optional
        The height of the Blockly workspace in pixels (default is 480).
    trashcan: bool, optional
        Whether to show the trashcan in the Blockly workspace (default is True).
    zoom: Optional[Dict], optional
        A dictionary defining zoom controls and settings for the Blockly workspace.
        If not provided, a default zoom configuration will be used.
    sound: bool, optional
        Whether to enable sound effects in the Blockly workspace (default is True).

    Returns:
    -------
    Dict
        The current state of the Blockly workspace as a dictionary.
    """
    # デフォルトのズーム設定
    default_zoom = {
        "controls": True,
        "wheel": True,
        "startScale": 1.0,
        "maxScale": 3,
        "minScale": 0.3,
        "scaleSpeed": 1.2,
    }

    # ズーム設定のデフォルトを適用
    zoom = zoom or default_zoom

    component_value = _component_func(
        name=name,
        key=key,
        locale=locale,
        toolbox=toolbox,
        custom_blocks=custom_blocks,
        workspace=workspace,
        height=height,
        trashcan=trashcan,
        zoom=zoom,
        sound=sound,
    )
    return component_value
