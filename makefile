all: build

format:
	go fmt *.go

build: format
	go build -o binary/hellolambda

clean:
	rm -fr binary

package: build
	cp $(CURDIR)/sheller.js $(CURDIR)/binary/sheller.js
	chmod +x $(CURDIR)/binary/hellolambda
	zip -Xj $(CURDIR)/binary/folder.zip $(CURDIR)/binary/* -x "*.DS_STORE"

run:
	chmod +x $(CURDIR)/binary/hellolambda
	$(CURDIR)/binary/hellolambda
