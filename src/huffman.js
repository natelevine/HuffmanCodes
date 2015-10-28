// // Given a Huffman tree and a string, encode that string into a new string
// // consisting only of 1s and 0s, using the code given by the tree.
var encodeString = function(input, huffmanTree) {
  var inputArr = input.split("");
  var output = [];

  var traverse = function (huffmanTree, input) {
	  if (huffmanTree.val === input) {
	  	return;
	  } else if (huffmanTree.right && huffmanTree.right.val.indexOf(input) >= 0) {
	  		output.push('1');
	  		traverse(huffmanTree.right, input);
	  } else if (huffmanTree.left && huffmanTree.left.val.indexOf(input) >= 0) {
	  		output.push('0');
	  		traverse(huffmanTree.left, input);
	  }
	};

	for (var i = 0; i < inputArr.length; i++) {
  	traverse(huffmanTree, inputArr[i]);
	}
	return output.join('');
};

// // Given a Huffman tree and a string of 1s and 0s, decode that string into
// // a new, human-readable string, using the code given by the tree.
var decodeString = function(input, huffmanTree) {
  var inputArr = input.split("");
  var output = [];

  var traverse = function(hufTree, input) {
  	// debugger;
  	if (hufTree.val.length === 1) {
  		output.push(hufTree.val[0]);
  		if (input.length === 0) {
  		return;
      } else {
  		// input.shift();
  		traverse(huffmanTree, input);
      }
  	} else if(input[0] === "0") {
  		input.shift();
  		traverse(hufTree.left, input);
  	} else if(input[0] === "1") {
  		input.shift();
  		traverse(hufTree.right, input);
  	}
  };
  traverse(huffmanTree, inputArr);
  return output.join('');
};

// Given a corpus of text, return a Huffman tree that represents the
// frequencies of characters in the corpus.
//
// You should use the `PriorityQueue` class that is provided in the
// file `priorityQueue.js`.  The relevant methods are .insert(key, val),
// which inserts a value with the given key into the queue, and
// .extract(), which returns the {key: key, val: val} pair with the lowest
// key priority.
//
// You may also use the `Tree` class that is provided in the file `misc.js`
// Some corpuses are included as the variables `lorumIpsum` and `declaration`.
var makeHuffmanTree = function(corpus) {

  var countFrequency = function(textBody) {
    var freqObj = {};
    //split to remove spaces, then get individual letters, and count occurrence in an object
    var letters = textBody.split('');
    letters.forEach(function(letter) {
      //double tilde coerces to 0 if undefined, otherwise just the number, then add 1;
      freqObj[letter] = ~~freqObj[letter] + 1;
    });
    return freqObj;
  };

    var queue = new PriorityQueue();
    var frequenciesObj = countFrequency(corpus);
    //Construct a tree for each letter, and insert them into the
    //pqueue according to their frequency
    for (var key in frequenciesObj) {
      var freq = frequenciesObj[key];
      var tree = new Tree([key]);
      queue.insert(freq, tree);
    }
    // debugger;
    while (queue.size() > 1) {
      var element1 = queue.extract();
      var element2 = queue.extract();

      var superTree = new Tree(element1.val.val.concat(element2.val.val));
      superTree.left = element1.val;
      superTree.right = element2.val;
      queue.insert(element1.key + element2.key, superTree);
    }

    return queue.extract().val;

};
