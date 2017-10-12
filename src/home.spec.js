'use strict';

describe('homeController', function() {
    var homeController;
    var $scope;

    beforeEach(angular.mock.module('hrsBlog'));

    beforeEach(angular.mock.inject(function(_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        homeController = _$controller_('homeController', {$scope: $scope});
    }));

    it('initializes homeController', function() {
        chai.expect(homeController).to.be.ok;
    });
});
