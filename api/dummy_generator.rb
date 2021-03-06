require 'json'
require 'pry'

launch_time = 1455104340

start_time = 1455104340 - (5 * 60)

post_lift_off_seconds = 4868

number_of_seconds = (launch_time - start_time) + 1018

time_object = {
  "timestamp" => start_time,
  "milestone" => false,
  "view_count" => 22
}

dummy_data = [time_object]

n = 22
i = 0
number_of_seconds.times do
	i += 1

	if i < 60
		n += rand(1..2)
	elsif i < 120
		n += rand(4..20)
	elsif i < 180
		n += rand(100..4000)
	elsif i < 240
		n += rand(200..8000)
	elsif i < 300
		n += rand(400..70000)
	elsif i < 400
		n -= rand(1000..20000)
	elsif i < 2000
		n -= rand(1..3500)
	end

	dummy_data << {
	  "timestamp" => dummy_data.last["timestamp"] + 1,
	  "milestone" => false,
	  "view_count" => n < 0 ? n = 0 : n
	}

	n += 1
end



File.open("temp.json","w") do |f|
  f.write(JSON.pretty_generate(dummy_data))
end