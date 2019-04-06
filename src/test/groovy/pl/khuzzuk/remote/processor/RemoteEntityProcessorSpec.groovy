package pl.khuzzuk.remote.processor

import spock.lang.Specification

class RemoteEntityProcessorSpec extends Specification {
    def "process remote entity success"() {
        expect:
        new RemoteEntityProcessor()
    }
}
