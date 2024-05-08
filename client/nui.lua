nui = {}
nui.registerCallback = RegisterNUICallback

local registeredStores = {}

function nui.sendAction(action, data)
  SendNUIMessage({
    action = action,
    data = data
  })
end

---@generic T
---@param name string
---@param defaultValue T
---@return { name: string, value: T, set: fun(self, val: T), onUpdate: fun(self, val: T) }
function nui.createStore(name, defaultValue)
  if registeredStores[name] then
    return registeredStores[name]
  end

  local store = {
    name = name,
    value = defaultValue
  }

  function store:set(value)
    self.value = value

    nui.sendAction("updateStore", {
      name = self.name,
      value = self.value
    })

    store:onUpdate(self.value)
  end

  function store:onUpdate(val)end

  setmetatable(store, {
    __gc = function()
      registeredStores[store.name] = nil
    end
  })

  registeredStores[store.name] = store
  return store
end

---@param name string
---@param theme NuiTheme
function nui.registerTheme(name, theme)
  nui.sendAction("registerTheme", {
    name = name,
    theme = theme
  })
end

---@param name string
function nui.setTheme(name)
  nui.sendAction("setTheme", name)
end

nui.registerCallback("getStoreValue", function(name, cb)
  local store = registeredStores[name]
  cb(store?.value)
end)

nui.registerCallback("setStoreValue", function(data, cb)
  local store = registeredStores[data.name]
  store:set(data.value)

  cb()
end)

nui.registerCallback("initialized", function(_, cb)
  nui.registerTheme("custom", Config.customTheme)
  nui.setTheme(Config.theme)

  cb()
end)

local visibilityStore = nui.createStore("visibility", false)

function nui.setVisibility(visible)
  visibilityStore:set(visible)
  SetNuiFocus(visible, visible)
end

nui.registerCallback("setVisible", nui.setVisibility)