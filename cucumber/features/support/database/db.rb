require 'active_record'

def estabilish_connection

	# connect to the database
	@db_connection = ActiveRecord::Base.establish_connection(ENV['SNAP_DB_PG_URL']);

#	@db_connection = ActiveRecord::Base.establish_connection(
#										:adapter => 'postgresql',
#                                       	:host => 'localhost',
#                                        :database => 'lavila',
#                                        :username => 'lavila',
#                                        :password => 'lavila');
end

