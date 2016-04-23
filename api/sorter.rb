require 'json'

data = File.read("data.json")

data = JSON.parse(data)

sorted = data["feed"].sort_by { |h| h["timestamp"] }

data["feed"] = sorted

File.open("data.json","w") do |f|
  f.write(JSON.pretty_generate(data))
end