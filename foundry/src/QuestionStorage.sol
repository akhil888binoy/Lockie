// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract QuestionStorage {
    string[] private questionHashes;

    function addhash(string memory questionHash) external {
        questionHashes.push(questionHash);
    }

    function getQuestionByIndex(uint256 questionIndex) external view returns (string memory) {
        require(questionIndex < questionHashes.length, "Index out of bounds");
        return questionHashes[questionIndex];
    }

    function getAllQuestions() external view returns (string[] memory) {
        return questionHashes;
    }
}
