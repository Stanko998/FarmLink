# FarmLink

## Necessary Dependencies

### You need $\color{cyan}{concurrently}$ installed on your pc.

</br>
To check if installed globaly run next command:

```bash
npm list -g concurrently
```

<div style="background-color:#282828;padding: 0 5px">

</br>
If responde is somting like this:

```
C:\Users\YourUsername\AppData\Roaming\npm
└──  concurrently@9.1.0
```

<span style=" color:green ;">you have concurrently install globaly. </span>

</br>
If responde is somting like this:

```
C:\Users\YourUsername\AppData\Roaming\npm
└── (empty)
```

<span style=" color:red ;">you havent concurrently install globaly. </span>

</div>

### <span style=" color:red ; font-weight: bold;"> If you havent concurrently</span> you need to install him globay with next line:

```bash
npm install -g concurrently
```

If all is success you can build application

## Build Setup

```bash
# install dependencies for Server and Client
$ npm run install
# run Server:5050 and Client
$ npm run dev

##########################

#Serup server API
$ cd Server

# Add Client.env
$ echo "FULLURI = "{YOUR_URI}" " >> Client.env

# OR
$ echo "USERNAME="{YOUR_USERNAME}"" >> Client.env
$ echo "PASSWORD="{YOUR_PASSWORD}"" >> Client.env

##########################
```
