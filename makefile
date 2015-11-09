all: build

format:
	go fmt *.go

build: format
	go build -o binary/hellolambda

clean:
	rm -fr binary

run:
	chmod +x $(CURDIR)/binary/redisping2
	$(CURDIR)/binary/redisping2