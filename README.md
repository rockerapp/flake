# FlakeId
A tiny module to generate time based 64-bit unique id, inspired by Twitter id (snowflake).

FlakeId takes 42 bit of timestamp, 10 bit of machine id (or any random number you provide), 12 bit of sequence number.
As javascript is limited to 53 bit integer precision, FlakeId generates a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) id like `285124269753503744n`, which can be easily be type casted into a 64 bit bigint in a database.

# Usage
Initializtion
```js
import flakeid from '@brecert/flakeid'

// initiate flake
const flake = new FlakeId({
  mid : 42, // optional, define machine id
  timeOffset : (2013-1970)*31536000*1000 // optional, define a offset time
});
```
Create a instance of flake as shown above which will be used to generate flake ids afterward.

Id generation
```js
const id1 = flake.gen(); // returns something like 285124269753503744n
const id2 = flake.gen(); // returns something like 285124417543999488n
```

# Options

`mid: number = 1`

A machine id or any random id. If you are generating id in distributed system, its highly advised to provide a proper mid which is unique to different machines.

`timeOffset: number = 0`
Time offset will be  subtracted from current time to get the first 42 bit of id. This help in generating smaller ids.

# Methods
`gen(): BigInt`
Method to generate id from FlakeId instance.
