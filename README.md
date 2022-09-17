# Recruitment Task
## Editor’s prototype for a redactor of a cryptocurrencie’s blog.
The application uses [Coinpaprika API (1.7.3)](https://api.coinpaprika.com) to get cryptocurrencies's data.

## How the application works

This App allows you to type in content along with suitable data markers. In twin window written text will be transformed in a way 
where the markers will be replaced with a results-driven action in a suitable method brought by appropriate argument.
Each argument should be formatted in a followed way: {{ MethodName/argument }}.

## Solutions used
Vanilla Js and Regular Expression 

## Example entry data : 

In 1998, Wei Dai published a description of "b-money", characterized as an anonymous,
distributed electronic cash system.[Shortly thereafter, Nick Szabo described bit gold. Like {{
Name/BTC }} and other cryptocurrencies that would follow it, bit gold (not to be confused
with the later gold-based exchange, {{ Name/BITGOLD }}) was described as an electronic
currency system which required users to complete a proof of work function with solutions
being cryptographically put together and published. A currency system based on a reusable
proof of work was later created by Hal Finney who followed the work of Dai and Szabo. The
first decentralized cryptocurrency, {{ Name/BTC }}, was created in 2009 by pseudonymous
developer Satoshi Nakamoto. It used SHA-256, a cryptographic hash function, as its
proof-of-work scheme. In April 2011, {{ Name/NMC }} was created as an attempt at forming a
decentralized DNS, which would make internet censorship very difficult. Soon after, in
October 2011, {{ Name/LTC }} was released. It was the first successful cryptocurrency to use
scrypt as its hash function instead of SHA-256. Another notable cryptocurrency, {{
Name/PPC }} was the first to use a proof-of-work/proof-of-stake hybrid
