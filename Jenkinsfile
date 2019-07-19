#!/usr/bin/env groovy

/*

	-= Jenkins pipeline file =-
	For automatic processing via the SamKnows Jenkins server https://cicd.samknows.com,
	with configuration pulled from LDAP.

	Author:  Russell Knighton
	Version: 5.0
	Date:    05/06/2019

*/

// We need this to beable to make variables Class level
import groovy.transform.Field

// We need to first extract the Repository and Branch names:
def tokens = "${env.JOB_NAME}".tokenize('/')
def githubOrg = tokens[tokens.size()-3]
def gitRepo = tokens[tokens.size()-2]
def gitBranch = tokens[tokens.size()-1]
def decodedRepoName = java.net.URLDecoder.decode(gitRepo, 'UTF-8')
def decodedBranchName = java.net.URLDecoder.decode(gitBranch, 'UTF-8')

// Source the SamKnows Library (sklib)
@Library('sklib@withstages')

// Load the LDAP connection Configuration and initialise the project
import org.sk.Project
@Field Project project
project = Project.newInstance(decodedRepoName, decodedBranchName, this)
project.init()

// Set-up the Jenkins pipeline job data retention policy, and prevent build concurency:
properties ([
	buildDiscarder(
		logRotator(
			artifactNumToKeepStr: project.getAttrVal('jenkinsArtifactNumToKeep').toString(),
			artifactDaysToKeepStr: project.getAttrVal('jenkinsArtifactDaysToKeep').toString(),
			daysToKeepStr: project.getAttrVal('jenkinsDaysToKeep').toString(),
			numToKeepStr: project.getAttrVal('jenkinsNumToKeep').toString()
		)
	), disableConcurrentBuilds()
])

// Load User Mapping class
import org.sk.Users
@Field Users skuser
skuser = Users.newInstance(this)

/* BEGIN: Main Jenkins Logic */
if (!(project.isEnabled())) {
	println "The project is currently disabled in LDAP."
	currentBuild.result = 'ABORTED'
} else {
	node (project.getJenkinsNodeType()) {
		currentBuild.result = 'SUCCESS'
		try {
			// Source checkout stage
			project.doCheckout()
			try {
				project.doToolsCheckStep()
				project.doBuild()
				project.doTest()
				project.doDeploy()
			} catch (e) {
				println e.toString()
				currentBuild.result = 'FAILURE'
			} finally {
				// If the project isn't disabled with a NOCI commit flag, we post reports:
				if (!(project.hasNoCiFlag())) {
					project.doReport()
				}
			}
		} catch (err) {
			currentBuild.result = 'FAILURE'
			println "Error caught:\n" + err.toString()
			def slackErrorMsg = "*Jenkins Pipiline Failure*\nSee Jenkins Output:\n${BUILD_URL}\n*Error message:*\n${err.getMessage()}\n"
			slackSend channel: project.getAttrVal('reportChannel'), color: project.stage('report').slackStatus.FAILURE, message: slackErrorMsg
			if (!(null == project.stage('report').getGitCommitAuthor())) {
				slackSend channel: skuser.getSlackName(project.stage('report').getGitCommitAuthor()), color: project.stage('report').slackStatus.FAILURE, message: slackErrorMsg
			}
			throw err
		}
	}
}
/* END: Main Jenkins Logic */
