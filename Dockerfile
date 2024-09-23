FROM maven AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
COPY --from=build /target/personalweb-0.0.1-SNAPSHOT.jar personalweb.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","personalweb.jar"]

#any time you need a new docker file for your project, 
#you can use the following command
#all you need to do is,
# copy only the part of """personalweb""" from java\com\example\"""personalweb"""
# then paste it to the personalweb spcae
