# Kamu

This is an application that focus on managing a physical library, you can add books, borrow and return them. It's available ~~here [http://twlib.herokuapp.com/](http://twlib.herokuapp.com/)~~.


## Setup development environment with Docker

The setup of the development environment and the provisioning is automated in some extend with Docker containers. Follow the next steps to build a development machine:

1. If you`ve vagrant machines running turn all off in order to avoid conflicting port issues
2. If you`ve Postgres running turn it off in order to able the bd port mappings work correctly  
3. Install Docker for Mac [here] (https://www.docker.com/products/docker#/mac)
4. Install [Git] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Mac)
5. Clone repositories for kamu-iu and kamu-api:
	* kamu-ui: `https://github.com/twlabs/kamu-ui.git`
	* kamu-api: `https://github.com/twlabs/kamu-api.git`
6. Open a shell window and go to kamu-ui directory
7. Run `docker-compose up` and wait until it download the containers and configure all the services
8. If the process fail with a message complaining `Port is already allocated` make sure the ports nedeed (``ports: 8080, 8001, 9000, 9091 and 5432``) are free in your machine, if so and still you have the message try rebooting your host machine, in any case, issue the command in step 7 again
9. The process should ends with the message `Listening for transport dt_socket at address: 8001` and displaying a banner of Kamu for spring boot like this
``MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM``
``MMMMmhyyyhdmMMMMMMMMMMMMMMMMMMMMMMMMMMmdhyyyhmMMMM``
``MMMhooooooooosyhmMMMMMMMMMMMMMMMMmhysooooooooohMMM``
``MMMyooooooooooooooshmMMMMMMMMmhsooooooooooooooyMMM``
``MMMyooooooooooooooooosNMMMMNsoooooooooooooooooyMMM``
``MMMyoooooooooooooooooosMMMMsooooooooooooooooooyMMM``
``MMMyoooooooooooooooooooNMMNoooooooooooooooooooyMMM``
``MMMdoooooooooooooooooooNMMNooooooooooooooooooodMMM``
``MMMNoooooooooooooooooooNMMNoooooooooooooooooooNMMM``
``MMMMyooooooooooooooooooNMMNooooooooooooooooooyMMMM``
``MMMMmooooooooooooooooooNMMNoooooooooooooooooomMMMM``
``MMMMMmyooooooooooooooooNMMNooooooooooooooooymMMMMM``
``MMMMMMMMmmdhyysooooooooNMMNoooooooosyyhdmmMMMMMMMM``
``MMMMMMMMMMMNhooooooooooNMMNoooooooooshNMMMMMMMMMMM``
``MMMMMMMMMMmoooooooooooyMMMMyooooooooooomMMMMMMMMMM``
``MMMMMMMMMMhooooooooooohMMMMhooooooooooohMMMMMMMMMM``
``MMMMMMMMMMsooooooooooodMMMMdooooooooooosMMMMMMMMMM``
``MMMMMMMMMMsoooooooooohMMMMMMhoooooooooosMMMMMMMMMM``
``MMMMMMMMMMyoooooooydNMMMMMMMMNdyoooooooyMMMMMMMMMM``
``MMMMMMMMMMMdhhddNMMMMMMMMMMMMMMMMNddhhdMMMMMMMMMMM``
``MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM``

10. Run the following command to load the database for Kamu:
	* `psql -h 127.0.0.1 -p 5432 -U libraryadmin -d librarydb < ./db/sample_data.sql`
	* You would need psql but not necessarily the whole rdbms, in fact rebember that if you install Postgresql make sure the server is down in order to avoid port conflicts with the server in the docker containter
	* Also you can use another tool of you preference for load the same file
11. To test the enviroment login into OktaPreview then go to Kamu Localhost, if you are able to see Kamu in you browser you enviroment is corretly set
12. Keep open the shell where you issued ``docker-compose up`` in order to see the log messages 

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

The board is available in Mingle [here] (https://kamu.mingle.thoughtworks.com/projects/kamu/overview).