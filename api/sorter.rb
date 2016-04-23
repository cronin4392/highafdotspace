require 'json'
require 'pry'

data = File.read("data.json")

data = JSON.parse(data)

sorted = data["feed"].sort_by { |h| h["timestamp"] }

visible_milestones = []
invisible_milestones = []
not_milestones = []

sorted.each do |e|
	if !e["milestone"].nil? && e["milestone"] == true && !e["visible"].nil?
		if e["visible"] == true
			visible_milestones << e
		elsif e["visible"] == false
			invisible_milestones << e
		end
	elsif e["milestone"].nil? || e["milestone"] == false
		not_milestones << e
	end
end

milestone_order = visible_milestones + invisible_milestones + not_milestones

data["feed_count"] = milestone_order.count
data["visible_milestone_count"] = visible_milestones.count
data["invisible_milestone_count"] = invisible_milestones.count
data["not_milestone_count"] = not_milestones.count

data["feed"] = milestone_order

File.open("data.json","w") do |f|
  f.write(JSON.pretty_generate(data))
end