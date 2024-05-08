local counter = nui.createStore("counter", 0)

function counter:onUpdate(value)
  print(value)
end

RegisterCommand("open", function()
  nui.setVisibility(true)
end)