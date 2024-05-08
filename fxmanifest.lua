fx_version "cerulean"

description "React Boilerplate"
author "Vertex Scripts"
version "0.0.0"

lua54 "yes"

ui_page "web/dist/index.html"

games {
	"gta5"
}

client_scripts {
	"config.client.lua",
	"client/nui.lua",
	"client/client.lua"
}

files {
	"web/dist/index.html",
	"web/dist/**/*"
}

escrow_ignore {
	"web/**/*",
}