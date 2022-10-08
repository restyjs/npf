```
echo "GET http://127.0.0.1:8080/ping" | vegeta attack -rate=20000 -duration=60s > result.bin
vegeta report *.bin

Requests      [total, rate, throughput]         1199999, 19999.89, 2846.45
Duration      [total, attack, wait]             1m0s, 1m0s, 138.744ms
Latencies     [min, mean, 50, 90, 95, 99, max]  13.901µs, 13.308ms, 74.656µs, 67.381ms, 95.629ms, 147.133ms, 460.417ms
Bytes In      [total, mean]                     684732, 0.57
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           14.27%
Status Codes  [code:count]                      0:1028816  200:171183
Error Set:
Get "http://127.0.0.1:8080/ping": read tcp 127.0.0.1:50468->127.0.0.1:8080: read: connection reset by peer
Get "http://127.0.0.1:8080/ping": read tcp 127.0.0.1:50472->127.0.0.1:8080: read: connection reset by peer
Get "http://127.0.0.1:8080/ping": read tcp 127.0.0.1:50473->127.0.0.1:8080: read: connection reset by peer
Get "http://127.0.0.1:8080/ping": read tcp 127.0.0.1:50474->127.0.0.1:8080: read: connection reset by peer
Get "http://127.0.0.1:8080/ping": read tcp 127.0.0.1:50478->127.0.0.1:8080: read: connection reset by peer
Get "http://127.0.0.1:8080/ping": read tcp 127.0.0.1:50480->127.0.0.1:8080: read: connection reset by peer
Get "http://127.0.0.1:8080/ping": dial tcp 0.0.0.0:0->127.0.0.1:8080: socket: too many open files
```

```
echo "GET http://127.0.0.1:8080" | vegeta attack -rate=20000 -duration=60s > result.bin

Requests      [total, rate, throughput]         1200000, 19999.86, 2767.46
Duration      [total, attack, wait]             1m0s, 1m0s, 55.33ms
Latencies     [min, mean, 50, 90, 95, 99, max]  13.56µs, 13.084ms, 77.306µs, 65.211ms, 94.173ms, 157.181ms, 403.801ms
Bytes In      [total, mean]                     664808, 0.55
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           13.85%
Status Codes  [code:count]                      0:1033798  200:166202
Error Set:
Get "http://127.0.0.1:8080": dial tcp 0.0.0.0:0->127.0.0.1:8080: socket: too many open files

```
