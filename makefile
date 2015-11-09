all: build

format:
	go fmt *.go

build: format
	go build -o binary/hellolambda

build-linux: format
	$GOOS=linux $GOARCH=386 go build -o binary/hellolambda

clean:
	rm -fr binary

docker-build:
	eval "$(docker-machine env prl-dev)"
	docker-compose up

package: clean docker-build
	cp $(CURDIR)/sheller.py $(CURDIR)/binary/sheller.py
	chmod +x $(CURDIR)/binary/hellolambda
	zip -Xj $(CURDIR)/binary/folder.zip $(CURDIR)/binary/* -x "*.DS_STORE"

run:
	chmod +x $(CURDIR)/binary/hellolambda
	$(CURDIR)/binary/hellolambda
