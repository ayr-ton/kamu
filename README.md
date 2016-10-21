# Kamu

This is an application that focus on managing a physical library, you can add books, borrow and return them. It's available here [http://twlib.herokuapp.com/](http://twlib.herokuapp.com/).


## Setup development environment with Docker

The setup of the development environment start from the kamu-api so no need the kamu-api right now, besides the provisioning is automated with Docker containers.

1. Install Docker for Mac [here] (https://www.docker.com/products/docker#/mac)
2. Clone repositories for kamu-iu and kamu-api:
	* kamu-ui: `https://github.com/twlabs/kamu-ui.git`
	* kamu-api: `https://github.com/twlabs/kamu-api.git`
3. Go to kamu-ui directory
4. Run `docker-compose up` and wait until it download the containers and configure all the services
5. If the process fail with a message complaining `Port is already allocated` make sure the ports nedeed are free in your machine, if so and still you have the message try rebooting your host machine, in any case, issue the command in step 4 again
6. The process should ends with the message `Listening for transport dt_socket at address: 8001` and displaying the banner of Kamu for spring boot
7. Run the following command to load the database for Kamu:
	* `psql -h 127.0.0.1 -p 5432 -U libraryadmin -d librarydb < ./db/sample_data.sql`
	
	Also you can use another tool of you preference for load the same file
8. To test the enviroment login into OktaPreview then go to Kamu Localhost, if you are able to see Kamu in you browser you enviroment is corretly set

## Debugging with IntelliJ

After the previous steps were sucessful executed:

1. Go to IntelliJ
2. Import the project kamu-api
3. Go to menu Run > Edit Configurations > Add New Configuration > Remote
4. Set a name for the configuration
5. Replace the default address 5005 by 8001 in all the command line setups
6. To test the configuration:
	* Open CopyController class and place a interruption point inside listCopies method
	* Reload Kamu
	* If the interruption point is reached is all set and you are ready for dev...\o/

If you need to connect to database just point to port 5432 and login with you preferred database client using:
	* POSTGRES_PASSWORD: admin
	* POSTGRES_USER: libraryadmin
	* POSTGRES_DB: librarydb 

# Wiki

Our wiki is hosted here [wiki](https://github.com/tw-library/library-ui/wiki). Please refer to it for more information about the project.

## Issues

The board is available at: https://kamu.mingle.thoughtworks.com/projects/kamu/overview